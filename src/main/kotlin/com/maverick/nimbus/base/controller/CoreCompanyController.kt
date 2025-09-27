package com.maverick.nimbus

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag

import com.maverick.nimbus.CoreCompany
import com.maverick.nimbus.repository.CoreCompanyRepository

import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/api/v1/company")
@Tag(name = "Company Management", description = "APIs for managing company")
class CoreCompanyController {

    @Autowired
    private lateinit var coreCompanyRepository: CoreCompanyRepository

    private val logger = LoggerFactory.getLogger(CoreCompanyController::class.java)

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieve a list of all users")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved users")
    fun getAllCompany(): List<CoreCompany> {
        return coreCompanyRepository.findAll()
    }

    @GetMapping("/{id}")
    fun getBySpecificCompany(
        @PathVariable id: Long
    ): ResponseEntity<CoreCompany> {
       val company = coreCompanyRepository.findById(id)
        return if (company.isPresent) {
            ResponseEntity.ok(company.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun createCompany(@RequestBody company: CoreCompany): CoreCompany {
        return coreCompanyRepository.save(company)
    }

}