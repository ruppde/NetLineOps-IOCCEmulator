package com.netline.webservices.controller.security;

import com.netline.webservices.service.security.AuthorizationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://127.0.0.1:1841", allowCredentials = "true")
@RequestMapping("/")
public class AuthorizationController {

    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping(value = "/authorization", produces = "application/json")
    @Operation(summary = "Authorize", description = "Retrieves authorizations", tags = "Security")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "SUCCESS",
                    content = { @Content }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content) })
    public ResponseEntity<String> doAuthorize(@CookieValue(name = "IOCC-Cert-zipped", required = false) String IOCCCertZipped) {
        IOCCCertZipped = "ASD";
        return authorizationService.doAuthorize(IOCCCertZipped);
    }

}