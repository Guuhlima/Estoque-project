package com.example.winostock.data

import com.example.winostock.models.Equipamento
import io.ktor.client.*
import io.ktor.client.engine.okhttp.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

object ApiService {
    private val client = HttpClient(OkHttp) {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    suspend fun cadastrarEquipamento(equipamento: Equipamento): Boolean {
        return try {
            val response = client.post("http://10.0.2.2:4000/cadastro") {
                contentType(ContentType.Application.Json)
                setBody(equipamento)
            }
            response.status.value in 200..299
        } catch (e: Exception) {
            false
        }
    }
}
