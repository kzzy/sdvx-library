from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Song(models.Model):
    class Meta:
        verbose_name = "Song"
        verbose_name_plural = "Songs"

    class KonasuteUnlockMethods(models.TextChoices):
        BLASTERGATE_DEFAULT = "BLASTERGATE_DEFAULT", "Default Blaster Gate"
        BLASTERGATE_EVENT = "BLASTERGATE_EVENT", "Event Blaster Gate"
        BASE = "BASE", "Base Unlock"
        VOLUMEPACK = "VOLUMEPACK", "Volume Pack Unlock"

    class ArcadeUnlockMethods(models.TextChoices):
        PCB = "PCB", "PCB Unlock"
        BASE = "BASE", "Base Unlock"
        BLASTERGATE = "BLASTERGATE", "Default Blaster Gate"
        HEXADIVER = "HEXADIVER", "Hexa Diver"
        OMEGADIMENSION = "OMEGADIMENSION", "Omega Dimension"

    def __str__(self):
        return self.title

    title = models.CharField(max_length=200, unique=True)
    alternateTitle = models.CharField(max_length=200, blank=True)
    duration = models.CharField(max_length=5)
    bpm = models.CharField(max_length=20) # Store as string to support bpm ranges
    artist = models.CharField(max_length=75)
    effector = models.CharField(max_length=75)
    album = models.CharField(blank=True, max_length=75)
    isArcade = models.BooleanField(null=True)
    isKonasute = models.BooleanField(null=True)
    konasuteVolumePack = models.IntegerField(default=-1)
    releaseDate = models.DateField(blank=True, null=True)
    konasuteUnlockMethod = models.CharField(max_length=20, choices=KonasuteUnlockMethods.choices, blank=True)
    arcadeUnlockMethod = models.CharField(max_length=20, choices=ArcadeUnlockMethods.choices, blank=True)
    bannerFilename = models.CharField(blank=True, null=True, max_length=100)

class Chart(models.Model):
    class Meta:
        verbose_name = "Chart"
        verbose_name_plural = "Charts"

    class DifficultyNames(models.TextChoices):
        NOVICE = "NOVICE", "Novice"
        ADVANCED = "ADVANCED", "Advanced"
        EXHAUST = "EXHAUST", "Exhaust"
        INFINITE = "INFINITE", "Infinite"
        GRAVITY = "GRAVITY", "Gravity"
        MAXIMUM = "MAXIMUM", "Maximum"
        HEAVENLY = "HEAVENLY", "Heavenly"
        VIVID = "VIVID", "Vivid"
        EXCEED = "EXCEED", "Exceed"

    def __str__(self):
        return self.songTitle.title + " " + self.difficultyName

    songTitle = models.ForeignKey('Song', on_delete=models.CASCADE, related_name='charts')
    difficultyName = models.CharField(max_length=10, choices=DifficultyNames.choices)
    level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    releaseDate = models.DateField(blank=True, null=True)
    tier = models.CharField(blank=True, max_length=2) # Unless there is a SSS ranked song,
    diffIsArcade = models.BooleanField()
    diffIsKonasute = models.BooleanField()
    jacketFilename = models.CharField(max_length=100)
    jacketArtist = models.CharField(max_length=50)
    maxChain = models.IntegerField(blank=True, null=True)
    maxChipNotes = models.IntegerField(blank=True, null=True)
    maxLongNotes = models.IntegerField(blank=True, null=True)
    maxVolNotes = models.IntegerField(blank=True, null=True)
    radarNotes = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    radarPeak = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    radarTsumami = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    radarOnehanded = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    radarHandtrip = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    radarTricky = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])