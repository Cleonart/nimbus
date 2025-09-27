package com.maverick.nimbus

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.RestController
import org.slf4j.LoggerFactory

import com.maverick.nimbus.CoreModules

@RestController
@RequestMapping("/api/v1/modules")
class CoreModulesController {

    private val logger = LoggerFactory.getLogger(CoreModulesController::class.java)

    @GetMapping
    fun getList(): Map<String, String> {
        logger.info("GET /hello endpoint was called")
        logger.debug("Some debug details here")
        logger.error("Example error log")
        return mapOf("message" to "Hello, Kotlin + Spring Boot!")
    }

    @GetMapping("/{id}")
    fun getDetailOfModule(): Map<String, String> {
        return mapOf("message" to "test 1234")
    }

}