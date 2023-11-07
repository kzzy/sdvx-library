import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django_filters import FilterSet, CharFilter
from django.db.models import Q
from .models import Song, Chart

class SongFilter(FilterSet):
    q = CharFilter(method="search_by_term")
    all = CharFilter(method="search_all")

    class Meta:
        model = Song
        fields = ['q', 'all']

    def search_all(self, queryset, name, value):
        return queryset.order_by('title')
    
    def search_by_term(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(alternateTitle__icontains=value)
        ).order_by('title')

class SongNode(DjangoObjectType):
    class Meta:
        model = Song
        interfaces = (relay.Node, )
        filterset_class = SongFilter

class ChartNode(DjangoObjectType):
    class Meta:
        model = Chart
        filter_fields = [
                  "id",
                  "songTitle",
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
                  "radarTricky"
        ]
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    song = relay.Node.Field(SongNode)
    songs = DjangoFilterConnectionField(SongNode)
    
    chart = relay.Node.Field(ChartNode)
    charts = DjangoFilterConnectionField(ChartNode)

    # Worth finding a better solution over this
    def resolve_charts(self, info, songTitle):
        return Chart.objects.all().order_by('level')
    
schema = graphene.Schema(query=Query)
