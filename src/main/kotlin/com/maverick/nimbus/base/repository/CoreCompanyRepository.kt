package com.maverick.nimbus.repository

import com.maverick.nimbus.CoreCompany
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CoreCompanyRepository : JpaRepository<CoreCompany, Long> {

    fun findByCode(code: String): List<CoreCompany>

}