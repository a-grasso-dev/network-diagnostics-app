async function runTest() {
    const host = document.getElementById("host").value;
    if (!host) {
      document.getElementById("result").innerText = "❗ Veuillez entrer un nom de domaine ou une IP.";
      return;
    }
  
    try {
      const res = await fetch(`/api/diagnostic?host=${encodeURIComponent(host)}`);
      const data = await res.json();
  
      document.getElementById("result").innerText =
        `🔍 Résultats pour : ${host}\n\n` +
        `🟢 PING:\n${data.ping}\n\n` +
        `🔵 NSLOOKUP:\n${data.nslookup}\n\n` +
        `🟣 TRACEROUTE:\n${data.traceroute}`;
    } catch (err) {
      document.getElementById("result").innerText = "❌ Erreur lors du diagnostic.";
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
  