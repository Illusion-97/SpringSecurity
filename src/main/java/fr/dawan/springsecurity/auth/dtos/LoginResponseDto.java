package fr.dawan.springsecurity.auth.dtos;

import fr.dawan.springsecurity.user.Roles;
import lombok.Value;

import java.io.Serializable;
import java.util.Set;

@Value
public class LoginResponseDto implements Serializable{
	UserDto user;
	String token;

	@Value
	public static class UserDto {
		long id;
		String firstname;
		String lastname;
		String email;
		Set<Roles> roles;
	}
}
