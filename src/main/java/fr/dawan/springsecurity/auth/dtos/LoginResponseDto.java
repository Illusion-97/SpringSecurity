package fr.dawan.springsecurity.auth.dtos;

import fr.dawan.springsecurity.user.Roles;

import java.io.Serializable;
import java.util.Set;

public record LoginResponseDto(fr.dawan.springsecurity.auth.dtos.LoginResponseDto.UserDto user,
                               String token) implements Serializable {
    public record UserDto(long id, String firstname, String lastname, String email,
                          Set<Roles> roles) implements Serializable {
    }
}
