import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from .models import Song, Chart

class SongType(DjangoObjectType):
    class Meta:
        model = Song
        fields = ("title", 
                 "alternateTitle",
                 "duration", 
                 "bpm", 
                 "artist", 
                 "effector", 
                 "album", 
                 "isArcade", 
                 "isKonasute", 
                 "konasuteVolumePack", 
                 "releaseDate", 
                 "konasuteUnlockMethod", 
                 "arcadeUnlockMethod"
                 )

class ChartType(DjangoObjectType):
    class Meta:
        model = Chart
        fields = ("songTitle",
                  "difficultyName",
                  "level",
                  "releaseDate",
                  "tier",
                  "diffIsArcade",
                  "diffIsKonasute",
                  "jacketFilename",
                  "jacketArtist",
                  "maxChain",
                  "maxChipNotes",
                  "maxLongNotes",
                  "maxVolNotes",
                  "radarNotes",
                  "radarPeak",
                  "radarTsumami",
                  "radarOnehanded",
                  "radarHandtrip",
                  "radarTricky")

class Query(graphene.ObjectType):
    # Song querying
    songs = graphene.List(SongType)
    songs_like_name = graphene.List(SongType, title=graphene.String())
    songs_by_konasute = graphene.Field(SongType, isKonasute=graphene.Boolean())

    def resolve_songs(root, info):
        return Song.objects.all()
    
    def resolve_songs_like_name(root, info, title):
        return Song.objects.filter(Q(title__contains=title) | Q(alternateTitle__contains=title))
    
    def resolve_songs_by_konasute(root, info, isKonasute):
        return Song.objects.get(isKonasute=isKonasute)
    
    # Chart querying
    charts = graphene.List(ChartType)
    charts_by_name = graphene.List(ChartType, songTitle=graphene.String())

    def resolve_charts(root, info):
        return Chart.objects.all()
    
    def resolve_charts_by_name(root, info, songTitle):
        songs = Song.objects.get(title=songTitle)
        return songs.chart_set.all().order_by('level')

schema = graphene.Schema(query=Query)