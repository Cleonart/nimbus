package com.maverick.nimbus.service

import com.maverick.nimbus.CoreCompany
import com.maverick.nimbus.repository.CoreCompanyRepository
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory

@Service
class CoreCompanyService(private val repository: CoreCompanyRepository) {

    private val logger = LoggerFactory.getLogger(CoreCompanyService::class.java)

    fun getAllCompanies(): List<CoreCompany> {
        logger.info("test12323")
        return repository.findAll()
    }

    fun getCompanyById(id: Long): CoreCompany? = repository.findById(id).orElse(null)

    fun createCompany(code: String, name: String): CoreCompany {
        return repository.save(CoreCompany(code, name))
    }

    fun updateCompany(id: Long, code: String, name: String): CoreCompany? {
        val existing = repository.findById(id).orElse(null) ?: return null
        existing.code = code
        existing.name = name
        return repository.save(existing)
    }

    fun deleteCompany(id: Long): Boolean {
        if (repository.existsById(id)) {
            repository.deleteById(id)
            return true
        }
        return false
    }
}
