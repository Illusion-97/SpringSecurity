package fr.dawan.springsecurity.user;

import lombok.Value;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link User}
 */
@Value
public class UserDto implements Serializable {
    long id;
    int version;
    String firstname;
    String lastname;
    String email;
    Set<Roles> roles;
}
