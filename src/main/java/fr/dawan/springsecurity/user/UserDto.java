package fr.dawan.springsecurity.user;


import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link User}
 */
public record UserDto(long id, int version, String firstname, String lastname, String email,
                      Set<Roles> roles) implements Serializable {
}
