const fs = require('fs');

fs.readFile('stringheday2.txt', 'utf8', (err, contenuto) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }

    const righe = contenuto.split('\n');

    function rigaValida(riga) {
        const numeri = riga.split(' ').map(Number);

        let crescente = true;
        let decrescente = true;

        for (let i = 1; i < numeri.length; i++) {
            const differenza = numeri[i] - numeri[i - 1];

            if (!(differenza >= 1 && differenza <= 3)) {
                crescente = false;
            }
            if (!(differenza <= -1 && differenza >= -3)) {
                decrescente = false;
            }
        }

        return crescente || decrescente;
    }

    function rigaValidaRimuovendoUnElemento(riga) {
        const numeri = riga.split(' ').map(Number);

        for (let i = 0; i < numeri.length; i++) {
            const nuovaRiga = [...numeri.slice(0, i), ...numeri.slice(i + 1)];
            if (rigaValida(nuovaRiga.join(' '))) {
                return true;
            }
        }

        return false;
    }

    const righeValideDiDefault = righe.filter(riga => rigaValida(riga));
    const righeValideDopoModifica = righe.filter(riga => !rigaValida(riga) && rigaValidaRimuovendoUnElemento(riga));

    const righeValideTotali = [...righeValideDiDefault, ...righeValideDopoModifica];
    const numeroRigheValideTotali = righeValideTotali.length;

    console.log('Righe valide di default (senza modifiche):');
    console.log(righeValideDiDefault.join('\n'));

    console.log('\nRighe valide dopo la modifica (rimozione di un numero):');
    console.log(righeValideDopoModifica.join('\n'));

    console.log(`\nTotale righe valide (incluse quelle modificate): ${numeroRigheValideTotali}`);
});
