UPDATE [dbo].[Conteudo]
SET [Nome]=@Nome,
    [Realizador]=@Realizador,
    [Rating]=@Rating,
    [DataReleased]=@DataReleased,
    [Sinopse]=@Sinopse
WHERE [ID]=@Id


SELECT [Id]
        ,[Nome]
        ,[Poster]
        ,[Realizador]
        ,[Rating]
        ,[DataReleased]
        ,[Sinopse]
FROM [dbo].[Conteudo]
WHERE [Id] = @Id