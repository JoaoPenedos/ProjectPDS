SELECT [Id]
        ,[Nome]
        ,[Poster]
        ,[Realizador]
        ,[Rating]
        ,[DataReleased]
        ,[Sinopse]
FROM [dbo].[Conteudo]
WHERE [Id] = @Id