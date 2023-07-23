package com.netline.webservices.controller.security;

import com.netline.webservices.dto.IdentityDTO;
import com.netline.webservices.model.Identity;
import com.netline.webservices.service.security.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://127.0.0.1:1841", allowCredentials = "true", exposedHeaders = "Set-Cookie", allowedHeaders = "Set-Cookie")
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping(value = "/{username}", produces = "application/json")
    @Operation(summary = "Authenticate", description = "Attempts to authenticate an user based on the credentials provided", tags = "Security")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = IdentityDTO.class)) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized (login unsuccessful)",
                    content = @Content) })
    public ResponseEntity<String> doAuthenticate(@PathVariable String username, @RequestHeader("password") String password) {
        return authenticationService.doAuthenticate(username, password);
    }

}