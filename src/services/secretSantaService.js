exports.assignSecretSantas = (members) => {
    let assignments = {};
    let availableReceivers = [...members];

    members.forEach(giver => {
        let possibleReceivers = availableReceivers.filter(receiver => receiver !== giver);
        if (possibleReceivers.length === 0) {
            // Reset si aucun receveur n'est disponible (pour éviter le blocage)
            availableReceivers = [...members];
            possibleReceivers = availableReceivers.filter(receiver => receiver !== giver);
        }
        let receiverIndex = Math.floor(Math.random() * possibleReceivers.length);
        assignments[giver] = possibleReceivers[receiverIndex];

        // Retirer le receveur assigné de la liste des disponibles
        availableReceivers.splice(availableReceivers.indexOf(possibleReceivers[receiverIndex]), 1);
    });

    return assignments;
};
