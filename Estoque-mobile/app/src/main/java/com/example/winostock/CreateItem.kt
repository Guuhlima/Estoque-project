package com.example.winostock
import android.provider.ContactsContract.Data
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun CreateItem() {
    var equipamento by remember { mutableStateOf("")}
    var quantidade by remember { mutableStateOf("")}
    var data by remember { mutableStateOf("")}
    var mensagem by remember { mutableStateOf("")}

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Cadastro de Equipamento",
            fontSize = 22.sp,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        OutlinedTextField(
            value = equipamento,
            onValueChange = { equipamento = it },
            label = { Text("Equipamento")},
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = quantidade,
            onValueChange = { quantidade = it },
            label = { Text("Quantidade")},
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 12.dp )
        )

        OutlinedTextField(
            value = data,
            onValueChange = { data = it},
            label = { Text("Data")},
            placeholder = { Text("YYYY-MM-DD") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 12.dp)
        )

        Button(
            onClick = {
                enviarCadastro(equipamento, quantidade, data) {
                    mensagem = it
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 24.dp)
        ) {
            Text("Cadastrar")
        }

        if (mensagem.isNotEmpty()) {
            Text(
                text = mensagem,
                color = if (mensagem.contains("sucesso",true)) Color.Green else Color.Red,
                modifier = Modifier
                    .padding(top = 24.dp)
            )
        }
    }

}
