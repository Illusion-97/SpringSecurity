package fr.dawan.springsecurity.auth.filters;

import fr.dawan.springsecurity.auth.conf.SecurityConfig;
import fr.dawan.springsecurity.auth.tools.JwtUtils;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if (!request.getMethod().equals("OPTIONS") && isInterceptedUrl(request.getRequestURI())) {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                if (authHeader == null || (!authHeader.startsWith("Bearer") && !authHeader.startsWith("bearer")))
                    throw new ServletException("Invalid authorization");
                String jwtToken = authHeader.substring(7);
                String username = JwtUtils.extractUsername(jwtToken);
                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (Boolean.TRUE.equals(JwtUtils.validateToken(jwtToken, userDetails))) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, jwtToken, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else
                        throw new ServletException("Invalid token");
                }
        }
        filterChain.doFilter(request, response);
    }

    private boolean isInterceptedUrl(String URI) {
        return Arrays.stream(SecurityConfig.authorizedUrls).map(s -> s.replace("**", ".*")).noneMatch(URI::matches);
    }

}
