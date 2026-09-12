<?php
declare(strict_types=1);

/**
 * Enregistre en session le message flash à afficher dans une vue.
 *
 * Un seul message est conservé à la fois : un nouvel appel écrase le précédent,
 * afin que la vue n'affiche jamais simultanément une erreur et un succès.
 *
 * @param string $type - Type de l'alerte (danger, success, warning, info)
 * @param string $message - Message destiné à l'utilisateur
 *
 * @return void
 */
function addFlash(string $type, string $message): void
{
    $allowedTypes = ['danger', 'success', 'warning', 'info'];

    if (!in_array($type, $allowedTypes, true)) {
        $type = 'info';
    }

    $_SESSION['APP']['flash'] = [
        'type'    => $type,
        'message' => $message,
    ];
}

/**
 * Récupère le message flash en attente et le retire de la session.
 *
 * @return array|null
 */
function getFlash(): ?array
{
    if (!isset($_SESSION['APP']['flash'])) {
        return null;
    }

    $flash = $_SESSION['APP']['flash'];
    clearFlash();

    return $flash;
}

/**
 * Vérifie si un flash existe en session pour un type d'alerte donné.
 *
 * @param string $type - Type de l'alerte (danger, success, warning, info)
 *
 * @return bool
 */
function hasFlash(string $type): bool
{
    return ($_SESSION['APP']['flash']['type'] ?? null) === $type;
}

/**
 * Supprime un flash
 *
 * @return void
 */
function clearFlash(): void
{
    unset($_SESSION['APP']['flash']);
}
