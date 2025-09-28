package com.maverick.nimbus.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.Contact
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {
    
    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("Maverick Nimbus Project API")
                    .version("1.0.0")
                    .description("A comprehensive REST API for NIMBUS ERP to handle most of the task")
                    .contact(
                        Contact()
                            .name("Azarya")
                            .email("azarya@gmail.com")
                    )
            )
    }
}