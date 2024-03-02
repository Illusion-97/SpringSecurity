package fr.dawan.springsecurity.user;


import lombok.Value;

import java.time.LocalDateTime;

@Value
public class UserFilter {
    LocalDateTime createdDate;
    LocalDateTime updatedDate;
    String firstname;
    String lastname;
    String email;
    Roles roles;
}
