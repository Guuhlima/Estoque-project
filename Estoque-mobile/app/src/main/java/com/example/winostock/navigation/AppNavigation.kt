package com.example.winostock.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.winostock.screens.CadastroScreen

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "cadastro") {
        composable("cadastro") { CadastroScreen() }
        // composable("login") { LoginScreen() }
    }
}
