package com.example.winostock.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.winostock.data.ApiService
import com.example.winostock.models.Usuarios
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.navigation.NavController
import kotlinx.coroutines.withContext

@Composable
fun LoginScreen(navController: NavController) {
    var email by remember { mutableStateOf("") }
    var senha by remember { mutableStateOf("") }
    var mensagem by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            TextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Email") }
            )
            Spacer(modifier = Modifier.height(8.dp))

            TextField(
                value = senha,
                onValueChange = { senha = it },
                label = { Text("Senha") }
            )
            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = {
                println("Enviando: login=$email, senha=$senha")
                CoroutineScope(Dispatchers.IO).launch {
                    val sucesso = ApiService.loginUsuario(
                        Usuarios(email = email, senha = senha)
                    )
                    println("Resultado da API: $sucesso")

                    withContext(Dispatchers.Main) {
                        if (sucesso) {
                            mensagem = "Login realizado"
                            navController.navigate("dashboard")
                        } else {
                            mensagem = "Erro ao logar"
                        }
                    }
                }
            }) {
                Text("Entrar")
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text(mensagem)
        }
    }
}
