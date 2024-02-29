package fr.dawan.springsecurity.auth.dtos;

import java.io.Serializable;

public record LoginDto(String email, String password) implements Serializable {
}
