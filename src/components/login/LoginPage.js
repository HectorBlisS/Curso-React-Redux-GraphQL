import React from 'react'
import styles from './login.module.css'

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <h1>
                Inicia Sesión con Google
            </h1>
            <h1>
                Cierra tu sesión
            </h1>
            <button>
                Iniciar
            </button>
            <button>
                Cerrar Sesión
            </button>
        </div>
    )
}