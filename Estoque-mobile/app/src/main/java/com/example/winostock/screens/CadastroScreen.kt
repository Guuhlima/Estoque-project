package com.example.winostock.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material3.Button
import androidx.compose.material3.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.winostock.data.ApiService
import com.example.winostock.models.Equipamento
import io.ktor.websocket.Frame
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun CadastroScreen() {
    var equipamento by remember { mutableStateOf("") }
    var quantidade by remember { mutableStateOf("") }
    var data by remember { mutableStateOf("") }
    var mensagem by remember { mutableStateOf("") }

    Column(modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)) {

        TextField(value = equipamento, onValueChange = { equipamento = it }, label = { Text("Equipamento") })
        Spacer(modifier = Modifier.height(8.dp))

        TextField(value = quantidade, onValueChange = { quantidade = it }, label = { Text("Quantidade") })
        Spacer(modifier = Modifier.height(8.dp))

        TextField(value = data, onValueChange = { data = it }, label = { Text("Data") })
        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            CoroutineScope(Dispatchers.IO).launch {
                val sucesso = ApiService.cadastrarEquipamento(
                    Equipamento(equipamento, quantidade, data)
                )
                mensagem = if (sucesso) "Cadastro realizado!" else "Erro no cadastro"
            }
        }) {
            Frame.Text("Cadastrar")
        }

        Spacer(modifier = Modifier.height(16.dp))
        Frame.Text(mensagem)
    }
}

@Composable
fun Text(s: String) {

}
