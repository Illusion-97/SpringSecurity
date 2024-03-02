package fr.dawan.springsecurity.user;

import fr.dawan.springsecurity.auth.UserSecurity;
import fr.dawan.springsecurity.generic.GenericService;
import fr.dawan.springsecurity.generic.filter.FilterService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService, GenericService<UserDto>, FilterService<UserDto, UserFilter> {
    @Override
    UserSecurity loadUserByUsername(String username) throws UsernameNotFoundException;
}
