package com.example.winostock

import io.ktor.client.*
import io.ktor.client.engine.okhttp.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import kotlinx.serialization.json.Json

fun enviarCadastro(
    equipamento: String,
    quantidade: String,
    data: String,
    onResult: (String) -> Unit
) {
    CoroutineScope(Dispatchers.IO).launch {
        try {
            val client = HttpClient(OkHttp) {
                install(ContentNegotiation) {
                    json(Json { ignoreUnknownKeys = true })
                }
            }

            val response = client.post("http://10.0.2.2:4000/cadastro") {
                contentType(ContentType.Application.Json)
                setBody(
                    mapOf(
                        "equipamento" to equipamento,
                        "quantidade" to quantidade,
                        "data" to data
                    )
                )
            }

            withContext(Dispatchers.Main) {
                if (response.status.value in 200..299) {
                    onResult("Cadastro realizado com sucesso!")
                } else {
                    onResult("Erro: ${response.status}")
                }
            }

            client.close()
        } catch (e: Exception) {
            withContext(Dispatchers.Main) {
                onResult("Falha: ${e.localizedMessage}")
            }
        }
    }
}
