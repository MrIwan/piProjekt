Wie funktioniert Flask Migrate:

Wenn

> flask db init

einmal ausgefürht wurde, dann gibt es ein migrations Ordner im Porjekt.


Will man nun eine migration vornehmen, so ändert man betreffende zeilen in models.py und führt dann:

> flask db migrate

aus und amschließend

> flask db upgrade

aus.



