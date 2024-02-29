package fr.dawan.springsecurity.auth;

import fr.dawan.springsecurity.auth.dtos.LoginDto;
import fr.dawan.springsecurity.auth.dtos.LoginResponseDto;
import fr.dawan.springsecurity.auth.dtos.RegisterDto;

public interface AuthService {

    void register(RegisterDto register);

    LoginResponseDto authenticate(LoginDto login) throws Exception;
}
