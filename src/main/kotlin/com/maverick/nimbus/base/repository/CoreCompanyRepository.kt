package com.maverick.nimbus.repository

import com.maverick.nimbus.CoreCompany
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.Query

@Repository
interface CoreCompanyRepository : JpaRepository<CoreCompany, Long> {

    fun findByCode(code: String): CoreCompany?

    @Query("SELECT c FROM CoreCompanyEntity c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    fun searchByName(name: String): List<CoreCompany>

}
