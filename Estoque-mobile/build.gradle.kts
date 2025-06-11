// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("application.gradle.plugin") version "8.3.1"
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    id("org.jetbrains.kotlin.plugin.serialization") version "1.9.0"
}