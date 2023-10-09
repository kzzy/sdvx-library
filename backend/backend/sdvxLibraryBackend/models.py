from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class SongResult(models.Model):
    class KonasuteUnlockMethods(models.TextChoices):
        BLASTERGATE_DEFAULT = "BLASTERGATE_DEFAULT", "Default Blaster Gate"
        BLASTERGATE_EVENT = "BLASTERGATE_EVENT", "Event Blaster Gate"
        BASE = "BASE", "Base Unlock"
        VOLUMEPACK = "VOLUMEPACK", "Volume Pack Unlock"

    class ArcadeUnlockMethods(models.TextChoices):
        PCB = "PCB", "PCB Unlock"
        BLASTERGATE = "BLASTERGATE", "Default Blaster Gate"
        HEXADIVER = "HEXADIVER", "Hexa Diver"
        OMEGADIMENSION = "OMEGADIMENSION", "Omega Dimension"

    title = models.CharField(max_length=200)
    duration = models.CharField(max_length=5)
    bpm = models.CharField(max_length=20) # Store as string to support bpm ranges
    artist = models.CharField(max_length=75)
    effector = models.CharField(max_length=75)
    album = models.CharField(max_length=75)
    is_arcade = models.BooleanField()
    is_konasute = models.BooleanField()
    konasute_volume_pack = models.IntegerField()
    release_date = models.DateTimeField()
    konasute_unlock_method = models.CharField(max_length=20, choices=KonasuteUnlockMethods.choices)
    arcade_unlock_method = models.CharField(max_length=20, choices=ArcadeUnlockMethods.choices)

class Chart(models.Model):
    class DifficultyNames(models.TextChoices):
        NOVICE = "NVC", "Novice"
        ADVANCED = "ADV", "Advanced"
        EXHAUST = "EXH", "Exhaust"
        INFINITE = "INF", "Infinite"
        GRAVITY = "GRV", "Gravity"
        MAXIMUM = "MXM", "Maximum"
        HEAVENLY = "HVN", "Heavenly"
        VIVID = "VVD", "Vivid"
        EXCEED = "XCD", "Exceed"

    song_title = models.ForeignKey('SongResult', on_delete=models.CASCADE)
    difficulty_name = models.CharField(max_length=10, choices=DifficultyNames.choices)
    level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    release_date = models.DateTimeField()
    tier = models.CharField(max_length=2) # Unless there is a SSS ranked song,
    diff_is_arcade = models.BooleanField()
    diff_is_konasute = models.BooleanField()
    jacket_filename = models.CharField(max_length=100)
    jacket_artist = models.CharField(max_length=50)
    max_chain = models.IntegerField(default=None)
    max_chip_notes = models.IntegerField(default=None)
    max_long_notes = models.IntegerField(default=None)
    max_vol_notes = models.IntegerField(default=None)
    radar_notes = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radar_peak = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radar_tsumami = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radar_onehanded = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radar_handtrip = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radar_tricky = models.IntegerField(default=None, validators=[MinValueValidator(0)])