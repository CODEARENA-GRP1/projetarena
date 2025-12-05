# app/utils/docker_runner.py
import docker
import uuid
import os

client = docker.from_env()

def run_code(code: str, timeout=2):
    """
    Exécute du code Python dans un sandbox Docker sécurisé.
    """
    # 1️⃣ Créer un fichier temporaire pour le code utilisateur
    filename = f"/tmp/{uuid.uuid4().hex}_user.py"
    with open(filename, "w") as f:
        f.write(code)

    container = None
    try:
        # 2️⃣ Lancer le conteneur
        container = client.containers.run(
            "sandbox-python",          # nom de l'image Docker à construire
            f"python /sandbox/{os.path.basename(filename)}",
            detach=True,
            mem_limit="50m",           # limite mémoire
            network_disabled=True      # pas d’accès réseau
        )

        # 3️⃣ Récupérer stdout et stderr
        logs = container.logs(stream=True, timeout=timeout)
        output = b"".join(logs).decode()
        status = "success"

    except docker.errors.APIError as e:
        output = f"Erreur Docker: {str(e)}"
        status = "failed"

    except Exception as e:
        output = f"Erreur: {str(e)}"
        status = "failed"

    finally:
        if container:
            container.remove(force=True)
        os.remove(filename)

    return {"status": status, "output": output}
