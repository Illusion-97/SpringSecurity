package fr.dawan.springsecurity.user;

import fr.dawan.springsecurity.auth.UserSecurity;
import fr.dawan.springsecurity.generic.GenericServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceImpl extends GenericServiceImpl<User, UserRepository, UserDto, UserMapper> implements UserService {
    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public UserSecurity loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).map(UserSecurity::new).orElseThrow();
    }

    @Override
    public Page<UserDto> findFiltered(UserFilter filter, Pageable pageable) {
        return repository.findBySearch(
                filter.getCreatedDate(),
                filter.getUpdatedDate(),
                filter.getFirstname(),
                filter.getLastname(),
                filter.getEmail(),
                filter.getRoles(),
                pageable
        ).map(mapper::toDto);
    }
}
