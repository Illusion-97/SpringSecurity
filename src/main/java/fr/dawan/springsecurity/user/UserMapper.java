package fr.dawan.springsecurity.user;

import fr.dawan.springsecurity.generic.GenericMapper;
import org.mapstruct.*;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Set;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface UserMapper extends GenericMapper<UserDto, User> {
}
