package com.example.winostock.data

import com.example.winostock.models.Equipamento
import com.example.winostock.models.Usuarios
import io.ktor.client.*
import io.ktor.client.call.body
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
            e.printStackTrace()
            println("Erro ao cadastrar: ${e.localizedMessage}")
            false
        }
    }

    suspend fun visualizarEquipamento(): List<Equipamento> {
        return try {
            client.get("http://10.0.2.2:4000/visualizar").body()
        } catch (e: Exception) {
            println("Erro ao buscar informações ${e.localizedMessage}")
            emptyList()
        }
    }

    suspend fun deletarEquipamento(id: Int): Boolean {
        return try {
            val response = client.delete("http://10.0.2.2:4000/deletar/$id")
            response.status.value in 200..299
        } catch (e: Exception) {
            println("Erro ao deletar equipamento: ${e.localizedMessage}")
            false
        }
    }

    suspend fun editarEquipamento(equipamento: Equipamento): Boolean {
        return try {
            val response = client.put("http://10.0.2.2:4000/editar/${equipamento.id}") {
                contentType(ContentType.Application.Json)
                setBody(equipamento)
            }
            response.status.value in 200..299
        } catch (e: Exception) {
            println("Erro ao editar equipamento: ${e.localizedMessage}")
            false
        }
    }

    //ABAIXO APIS DE USUARIOS

    suspend fun loginUsuario(usuario: Usuarios): Boolean {
        return try {
            val response = client.post("http://10.0.2.2:4000/user/login") {
                contentType(ContentType.Application.Json)
                setBody(usuario)
            }
            response.status.value in 200..299
        } catch (e: Exception) {
            e.printStackTrace()
            println("Erro ao realizar login: ${e.localizedMessage}")
            false
        }
    }
}
