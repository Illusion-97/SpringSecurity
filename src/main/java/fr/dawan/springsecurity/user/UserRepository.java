package fr.dawan.springsecurity.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("""
            FROM User u
            JOIN u.roles r
            WHERE
                    (:createdDate IS NULL OR u.createdDate = :createdDate) AND
                    (:updatedDate IS NULL OR u.updatedDate = :updatedDate) AND
                    (:firstname IS NULL OR u.firstname LIKE %:firstname%) AND
                    (:lastname IS NULL OR u.lastname LIKE %:lastname%) AND
                    (:email IS NULL OR u.email = :email) AND
                    (:roles IS NULL OR r = :roles)""")
    Page<User> findBySearch(
            LocalDateTime createdDate,
            LocalDateTime updatedDate,
            String firstname,
            String lastname,
            String email,
            Roles roles,
            Pageable pageable);
}
