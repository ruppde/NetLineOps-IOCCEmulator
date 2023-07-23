package com.netline.webservices;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("NetLine Emulator (AIMS Provider) API Docs")
                        .description("NetLine/Ops emulator back-end for NetLine/Ops++ Compact. Data is provided by AIMS.aero API hardcoded")
                        .version("v0.0.2"));
    }
}
