package fr.dawan.springsecurity.user;

import fr.dawan.springsecurity.auth.UserSecurity;
import fr.dawan.springsecurity.generic.GenericService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService, GenericService<UserDto> {
    @Override
    UserSecurity loadUserByUsername(String username) throws UsernameNotFoundException;
}
