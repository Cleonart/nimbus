package com.maverick.nimbus

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NimbusApplication

fun main(args: Array<String>) {
	runApplication<NimbusApplication>(*args)
}
