import graphene
from graphene_django import DjangoObjectType
from .models import SongResult, Chart

class SongResultType(DjangoObjectType):
    class Meta:
        model = SongResult
        fields = ("title", 
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
                 "arcadeUnlockMethod")

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
    songResults = graphene.List(SongResultType)
    getKonasuteSongs = graphene.Field(SongResultType, isKonasute=graphene.Boolean())

    def resolve_songResults(root, info):
        return SongResult.objects.all()
    
    def resolve_getKonasuteSongs(root, info, isKonasute):
        return SongResult.objects.get(isKonasute=isKonasute)
    
    # Chart querying
    charts = graphene.List(ChartType)

    def resolve_charts(root, info):
        return Chart.objects.all()

schema = graphene.Schema(query=Query)