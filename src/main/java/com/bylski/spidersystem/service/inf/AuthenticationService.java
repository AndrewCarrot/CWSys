package com.bylski.spidersystem.service.inf;


import com.bylski.spidersystem.controller.auth.AuthenticationRequest;
import com.bylski.spidersystem.controller.auth.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
