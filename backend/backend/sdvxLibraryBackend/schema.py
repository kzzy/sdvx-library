import graphene
from graphene_django import DjangoObjectType
from .models import SongResult

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

class Query(graphene.ObjectType):
    songResults = graphene.List(SongResultType)

    def resolve_songResults(root, info):
        return SongResult.objects.all()
    
schema = graphene.Schema(query=Query)