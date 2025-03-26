async function runTest() {
    const host = document.getElementById("host").value;
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");

    if (!host) {
        result.innerText = "❗ Veuillez entrer un nom de domaine ou une IP.";
        return;
    }

    // Afficher le loader et vider les anciens résultats
    loader.classList.remove("hidden");
    result.innerText = "";

    try {
        const res = await fetch(`/api/diagnostic?host=${encodeURIComponent(host)}`);
        const data = await res.json();

        result.innerText =
            `🔍 Résultats pour : ${host}\n\n` +
            `🟢 PING:\n${data.ping}\n\n` +
            `🔵 NSLOOKUP:\n${data.nslookup}\n\n` +
            `🟣 TRACEROUTE:\n${data.traceroute}`;
    } catch (err) {
        result.innerText = "❌ Erreur lors du diagnostic.";
    } finally {
        loader.classList.add("hidden"); // Masquer le loader dans tous les cas
    }
}


async function showHistory() {
    try {
        const res = await fetch(`/api/history`);
        const data = await res.json();

        let output = "📜 Historique des derniers diagnostics :\n\n";
        data.forEach((item, i) => {
            output += `${i + 1}. ${item.host}\n`;
            output += `   🟢 Ping: ${item.ping.split("\n")[0]}\n`;
            output += `   🟣 Traceroute: ${item.traceroute.split("\n")[0] || 'N/A'}\n\n`;
        });

        document.getElementById("result").innerText = output;
    } catch (err) {
        document.getElementById("result").innerText = "❌ Erreur lors de la récupération de l'historique.";
    }
}
