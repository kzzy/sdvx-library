from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class SongResult(models.Model):
    class Meta:
        verbose_name = 'song result'

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
    isArcade = models.BooleanField(null=True)
    isKonasute = models.BooleanField(null=True)
    konasuteVolumePack = models.IntegerField(default=-1)
    releaseDate = models.DateField()
    konasuteUnlockMethod = models.CharField(max_length=20, choices=KonasuteUnlockMethods.choices, blank=True)
    arcadeUnlockMethod = models.CharField(max_length=20, choices=ArcadeUnlockMethods.choices, blank=True)

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

    songTitle = models.ForeignKey('SongResult', on_delete=models.CASCADE)
    difficultyName = models.CharField(max_length=10, choices=DifficultyNames.choices)
    level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    releaseDate = models.DateTimeField()
    tier = models.CharField(max_length=2) # Unless there is a SSS ranked song,
    diffIsArcade = models.BooleanField()
    diffIsKonasute = models.BooleanField()
    jacketFilename = models.CharField(max_length=100)
    jacketArtist = models.CharField(max_length=50)
    maxChain = models.IntegerField(default=None)
    maxChipNotes = models.IntegerField(default=None)
    maxLongNotes = models.IntegerField(default=None)
    maxVolNotes = models.IntegerField(default=None)
    radarNotes = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radarPeak = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radarTsumami = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radarOnehanded = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radarHandtrip = models.IntegerField(default=None, validators=[MinValueValidator(0)])
    radarTricky = models.IntegerField(default=None, validators=[MinValueValidator(0)])