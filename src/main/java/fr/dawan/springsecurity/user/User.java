package fr.dawan.springsecurity.user;

import fr.dawan.springsecurity.generic.BaseEntity;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    @ElementCollection
    private Set<Roles> roles = Set.of(Roles.PUBLIC);
}
