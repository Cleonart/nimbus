package com.maverick.nimbus.repository

import com.maverick.nimbus.CoreCompany
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CoreCompanyService( private val repository: CoreCompanyRepository) {

    fun getAll(): List<CoreCompany> =
        repository.findAll()

    fun getByCode(code: String): CoreCompany? =
        repository.findByCode(code)

    fun searchByName(name: String): List<CoreCompany> =
        repository.searchByName(name)

    @Transactional
    fun create(code: String, name: String): CoreCompany {
        val entity = CoreCompany(code = code, name = name)
        return repository.save(entity)
    }

}
