package com.maverick.nimbus

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.slf4j.LoggerFactory

@RestController
class CoreCompanyController {

    private val logger = LoggerFactory.getLogger(CoreCompanyController::class.java)

    @GetMapping("/kotlin")
    fun hello(): Map<String, String> {
        logger.info("GET /hello endpoint was called")
        logger.debug("Some debug details here")
        logger.error("Example error log")
        return mapOf("message" to "Hello, Kotlin + Spring Boot!")
    }
}