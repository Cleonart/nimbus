package com.maverick.nimbus.repository

import com.maverick.nimbus.CoreCompany
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CoreCompanyRepository : JpaRepository<CoreCompany, Long> {
    // JpaRepository provides basic CRUD operations
    // You can add custom query methods here if needed
    // Example: fun findByName(name: String): List<CoreCompany>
}