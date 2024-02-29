package fr.dawan.springsecurity.auth;

import fr.dawan.springsecurity.auth.dtos.LoginResponseDto;
import fr.dawan.springsecurity.auth.dtos.RegisterDto;
import fr.dawan.springsecurity.user.User;
import fr.dawan.springsecurity.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {UserMapper.class})
public interface AuthMapper {

    User fromRegister(RegisterDto registerDto);
    @Mapping(target = "token", expression = "java(fr.dawan.springsecurity.auth.tools.JwtUtils.generateToken(security))")
    LoginResponseDto toResponse(UserSecurity security);
}
